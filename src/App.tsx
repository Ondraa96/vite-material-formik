import './App.css'
import {
  Card, CardContent, Grid,
  Button,
  CircularProgress,
} from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { Container } from '@mui/system'
import { boolean, number, object, string } from 'yup';
import { CheckboxWithLabel, TextField } from 'formik-mui';
import { useRef, useState } from 'react';

/*
  Input files:
  https://www.youtube.com/watch?v=sp9r6hSWH_o&ab_channel=CodeStepByStep

  Material-UI, Formik, Yup
  https://www.youtube.com/watch?v=me1kY_uFe5k&ab_channel=BrunoAntunes
*/

function App() {
  const [inputRefs, setInputRefs] = useState({});

  const handleOnChange = (e: any, i: number) => {
    setInputRefs(current => ({ ...current, [i]: e.target.files[0] }))

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => console.log(e.target!.result)
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Formik
            initialValues={{
              fullName: '',
              donationsAmount: 0,
              termsAndConditions: false,
              donations: []
            }}
            validationSchema={object({
              fullName: string().required(),
              donationsAmount: number().required().min(10),
              termsAndConditions: boolean().required().isTrue()
            })}
            onSubmit={async (values) => {
              console.log(values)
              console.log(inputRefs)
              return new Promise(res => setTimeout(res, 2500));
            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form autoComplete='off'>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Field name="fullName" component={TextField} label="Jméno" />
                  </Grid>
                  <Grid item>
                    <Field
                      name="donationsAmount"
                      component={TextField}
                      type="number"
                      label="Příspěvěk (czk)"
                    />
                  </Grid>
                  {/* 
                  <Field
                    name="donations[0]"
                    onChange={(e: any) => handleOnChange(e)}
                    component={TextField}
                    type="file"
                  /> */}
                  {[1, 2].map((val, index) => (
                    <Field
                      key={val}
                      name="donations[0]"
                      onChange={(e: any) => handleOnChange(e, index)}
                      component={TextField}
                      type="file"
                    />
                  ))}



                  <Grid item>
                    <Field
                      name="termsAndConditions"
                      component={CheckboxWithLabel}
                      Label={{ label: "Souhlasím s obchodními podmínkami" }}
                    />
                  </Grid>
                  <Grid item>

                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={isSubmitting ? <CircularProgress size={20} /> : undefined}
                    >
                      {isSubmitting ? "Potvrzování" : "Potvrdit"}
                    </Button>
                  </Grid>
                </Grid>
                <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Container >
  )
}

export default App;