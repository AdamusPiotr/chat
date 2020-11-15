import { Formik } from 'formik'
import React from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import { Button, Input } from '../../styled'
import * as Styles from './landingPage.styled'

export const LandingPage = () => {
    const history = useHistory();
    
    return (
        <Styles.Container>
            <Formik 
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={(values) => {
                    const path = generatePath('/:username/:room', values)
                    history.push(path)
                }}>
                    {({handleBlur, handleChange}) => 
                        <Styles.Form>
                            <Styles.Title >Let's join to our awesome chat!</Styles.Title>
                            <Input placeholder="Username" name="username" onChange={handleChange} onBlur={handleBlur}/>
                            <Input placeholder="Room" name="password"onChange={handleChange} onBlur={handleBlur}/>
                            <Button isAlignedToInput={false} type="submit">Join </Button>
                        </Styles.Form>
                    }
                </Formik>
           
        </Styles.Container>
    )
}
