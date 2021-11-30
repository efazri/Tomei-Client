import React, { useEffect, useState } from 'react';
import '../App.css'
import { ArrowRight, Avatar, Step1, Step2, Step3, Step4, Step5, TomeiLogo, WizardHorizontalBar } from '../assets';
import { Container, Col, Row, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';


function MobileView(props) {
    const [formSize, setFormSize] = useState('md');
    const [name, setName] = useState('');
    const [invalidName, setInvalidName] = useState(false);
    const [email, setEmail] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false);
    const [avatar, setAvatar] = useState('')
    const uploadHandle = React.useRef(null);

    const nameHandler = (e) => {
        setName(e.target.value);
        if (!/^[a-zA-Z ]*$/.test(e.target.value)){
            setInvalidName(true);
        } else if (e.target.value === ' '){
            setInvalidName(true);
        } else {
            setInvalidName(false);
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value);
        setTimeout(() => {
            if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value)) {
                setInvalidEmail(true);
            } else {
                setInvalidEmail(false);
            }
        }, 2000)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if(email){
            setInvalidPassword(false);   
        } else {
            setInvalidPassword(true);
        }
    }

    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);
        if (password !== e.target.value){
            setInvalidConfirmPassword(true);
        } else {
            setInvalidConfirmPassword(false);
        }
    }

    const validateData = () => {
        if (!name){
            setInvalidName(true);
        } else if (!/^[a-zA-Z ]*$/.test(name)){
            setInvalidName(true);
        } else if (name && /^[a-zA-Z ]*$/.test(name)){
            setInvalidName(false);
        }

        if (!email){
            setInvalidEmail(true);
        } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            setInvalidEmail(true);
        } else if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) && email){
            setInvalidEmail(false)
        }

        if (!password){
            setInvalidPassword(true);
        } else {
            setInvalidPassword(false);
        }

        if (confirmPassword !== password){
            setInvalidConfirmPassword(true)
        } else {
            setInvalidConfirmPassword(false)
        }

        if(!invalidName && !invalidEmail && !invalidPassword && !invalidConfirmPassword){
            return true
        } else {
            return false
        }
    }

    const submitHandle = () => {
        const validData = validateData();

        if (validData) {
            const data = {
                name,
                email,
                password,
                confirm_pass: confirmPassword,
                avatar_picture: avatar
            }
            axios.post('http://localhost:3000/users', data)
                .then(({ data }) => {
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    useEffect(() => {
        if (window.innerWidth > 1900){
            setFormSize('lg')
        } else if (window.innerWidth < 1300){
            setFormSize('sm')
        }
    }, [window.onresize])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '95vh'}}>
        <div className="d-flex flex-row justify-content-center mt-4">
            <div className="col-md-2 col-lg-2 col-2 d-flex flex-row justify-content-center">
                <img src={TomeiLogo} className="tomei-logo" alt="altLogo.png" />
            </div>
        </div>

        <div className="w-100 mt-4" >
            <Container className="d-flex flex-row justify-content-center col-12">
                <img src={WizardHorizontalBar} className="horizontal-bar" alt="wizardHorizontal.png" />
                <Row style={{ zIndex: 1}}>
                    <Col>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <img src={Step1} className="step-icon" alt="step1.png"/>
                        </div>
                        <div className="d-flex flex-row justify-content-center">
                            <label className='text-center bold step-text'>STEP 1:</label>
                        </div>
                        <label className='text-center semi-bold step-text'>CREATE YOUR ACCOUNT PASSWORD</label>
                    </Col>

                    <Col>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <img src={Step2} className="step-icon" alt="step3.png"/>
                        </div>
                        <div className="d-flex flex-row justify-content-center">
                            <label className='text-center bold step-text'>STEP 2:</label>
                        </div>
                        <label className='text-center semi-bold step-text'>PERSONAL INFORMATION</label>
                    </Col>

                    <Col>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <img src={Step3} className="step-icon" alt="step3.png"/>
                        </div>
                        <div className="d-flex flex-row justify-content-center">
                            <label className='text-center bold step-text'>STEP 3:</label>
                        </div>
                        <label className='text-center semi-bold step-text'>EMPLOYMENT DETAILS</label>
                    </Col>

                    <Col>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <img src={Step4} className="step-icon" alt="step4.png"/>
                        </div>
                        <div className="d-flex flex-row justify-content-center">
                            <label className='text-center bold step-text'>STEP 4:</label>
                        </div>
                        <label className='text-center semi-bold step-text'>UPLOAD DOCUMENTS</label>
                    </Col>

                    <Col>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <img src={Step5} className="step-icon" alt="step5.png"/>
                        </div>
                        <div className="d-flex flex-row justify-content-center">
                            <label className='text-center bold step-text'>STEP 5:</label>
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                            <label className='text-center semi-bold step-text'>COMPLETE</label>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

        <div className="d-flex flex-row justify-content-center w-100 mt-3">
            <div className='col-12 col-md-6 col-lg-8 d-flex flex-row justify-content-center p-1' style={{ backgroundColor: '#C5DCFA'}}>
            <span className="text-center semi-bold font-primary highlight-text">CREATE YOUR ACCOUNT</span>
            </div>
        </div>

        <div className="d-flex flex-row justify-content-center w-100">
            <div className="col-12 col-md-6 col-lg-8 p-3">
                <p className="text-center description-text semi-bold">
                    Because there will be documents that you need to prepare to apply for the loan, 
                    let's start off by creating a password so that you can login to your account once you have these document ready.
                </p>
            </div>
        </div>

        <div className="d-flex flex-row justify-content-center w-100">
            <Container className='col-12 col-md-6 col-lg-8'>
                
                <Row>
                    <div className="d-flex flex-column justify-content-center">
                        <div className="d-flex flex-row justify-content-center col-md-12">
                            <img src={Avatar} className="avatar-style" alt="avatarIcon.png" />
                        </div>
                        <div className="d-flex flex-row justify-content-center">
                                <input
                                    accept="image/*"
                                    style={{ display: 'none'}}
                                    id="contained-button-file"
                                    ref={uploadHandle}
                                    multiple
                                    type="file"
                                    onChange={(e) => setAvatar(e.target.files)}
                                />
                                <span className="bold upload-text" onClick={() => uploadHandle.current.click()} style={{ cursor: 'pointer'}}>Upload</span>
                            </div>
                    </div>
                </Row>

                <Row className="p-4 pt-0 pb-2">
                    <InputGroup hasValidation={true}>
                        <Col>
                            <label className="label semi-bold">NAME</label>
                            <Form.Control size={formSize} style={{ borderRadius: 10, borderColor: '#C7C7C7'}} required isInvalid={invalidName} onChange={(e) => nameHandler(e)} />
                            <Form.Control.Feedback type="invalid">
                                Please input your correct name
                            </Form.Control.Feedback>
                        </Col>
                    </InputGroup>
                </Row>

                <Row className="p-4 pt-0 pb-2">
                    <InputGroup hasValidation={true}>
                        <Col>
                            <label className="label semi-bold">EMAIL</label>
                            <Form.Control size={formSize} style={{ borderRadius: 10, borderColor: '#C7C7C7'}} required isInvalid={invalidEmail} onChange={(e) => emailHandler(e)} />
                            <Form.Control.Feedback type="invalid">
                                Please input valid email
                            </Form.Control.Feedback>
                        </Col>
                    </InputGroup>
                </Row>

                <Row className="p-4 pt-0 pb-2">
                    <InputGroup hasValidation={true}>
                        <Col>
                            <label className="label semi-bold">PASSWORD</label>
                            <Form.Control size={formSize} type="password" style={{ borderRadius: 10, borderColor: '#C7C7C7'}} required isInvalid={invalidPassword} onChange={(e) => passwordHandler(e)} />
                            <Form.Control.Feedback type="invalid">
                                Please input correct password
                            </Form.Control.Feedback>
                        </Col>
                    </InputGroup>
                </Row>

                <Row className="p-4 pt-0 pb-2">
                    <InputGroup>
                        <Col>
                            <label className="label semi-bold">CONFIRM PASSWORD</label>
                            <Form.Control size={formSize} type="password" style={{ borderRadius: 10, borderColor: '#C7C7C7'}} required isInvalid={invalidConfirmPassword} onChange={(e) => confirmPasswordHandler(e)} />
                            <Form.Control.Feedback type="invalid">
                                confirm password must be same with your password
                            </Form.Control.Feedback>
                        </Col>
                    </InputGroup>
                </Row>

            </Container>
        </div>

        <div className="d-flex flex-row justify-content-center w-100 mt-3">
            <div className="col-12 col-md-6 col-lg-8 d-flex flex-row justify-content-center">
                <button className="btn bg-softBlue" style={{ width: '20vh'}} onPress={() => submitHandle()}>
                    <div className="d-flex flex-row justify-content-evenly">
                        <span className="semi-bold font-tertiary p-1">SAVE & NEXT</span>
                        <img src={ArrowRight} alt="arrowIcon.png" className="arrow"/>
                    </div>
                </button>
            </div>
        </div>

        </div>
    );
}

export default MobileView;