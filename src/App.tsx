import './App.css'
import { Card, CardContent, Grid } from '@mui/material'
import { Form, Formik } from 'formik'

function App() {
  return (
    <Card>
      <CardContent>
        <Formik initialValues={{}} onSubmit={() => { }}>
          {({ values, errors }) => (
            <Form>
              <Grid container>
                <Grid item></Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}

export default App;