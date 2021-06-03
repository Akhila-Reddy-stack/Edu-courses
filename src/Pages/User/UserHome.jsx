import React, { Fragment, PureComponent } from 'react'
import { Container, Button } from 'react-bootstrap';
import { Col, Row } from 'reactstrap';
import _ from 'lodash';
import { withSnackbar } from 'notistack';
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { TextInput } from '../../Components/Forms/Input'
import qs from 'querystring'
import axios from 'axios'
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';

class UserHome extends PureComponent {
    constructor(props) {
        super(props)
        this.slider = React.createRef();
        this.state = {
            data: [],
        }
    }
    componentDidMount = async () => {
    
    }

    handleChange = async (e) => {
        // console.log(e)
        await this.setState({
            phone: e.target.value
        })
    }

    onSubmit = async () => {
        axios({
            method: 'post',
            url: 'https://eduinterview.appsfactory.io/api/rest/login',
            data: qs.stringify({
                phone: this.state.phone
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then((responseData) => {
            console.log(responseData, "res")
            this.props.history.push({
                pathname: `/otp`,
                state: {
                    otp: responseData?.data?.login?.data,
                    phone: this.state.phone
                },
            });
            console.log(responseData?.data?.login?.data.code, "res")
        })

    }



    render() {
        const { data, loading } = this.state;
        return (
            <Fragment>
                <>
                    <div className="login">
                        <div className="login-init">Hey Student,</div>
                        <p>Please login</p>
                        <div className="">
                            <div class="login-input">
                                <PhoneAndroidIcon className="login-phone" />
                                <TextInput field="id" label="" placeholder="Phone"  autoComplete="off" className="login-field"
                                    name="id" onChange={this.handleChange} />
                            </div>
                            <div className="login-button">
                                <Button type="submit" className="login-btn" onClick={this.onSubmit} >
                                    Continue
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            </Fragment >
        );
    }
}

export default withSnackbar(UserHome)




