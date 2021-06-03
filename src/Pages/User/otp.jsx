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
import PhonelinkLockIcon from '@material-ui/icons/PhonelinkLock';

class Otp extends PureComponent {
    constructor(props) {
        super(props)
        this.slider = React.createRef();
        this.state = {
            data: [],
            loading: true,
            bannerImgs: [],
            autoplay: true,
            itemsList: []
        }
    }

    componentDidMount = async () => {
        console.log(this.props)
        if (this.props.location.state != undefined && this.props.location.state) {
            console.log("oooooo");
            await this.setState({
                validateotp: this.props.location.state?.otp?.code,
                phone: this.props.location.state?.phone,
                
            });
        }

    }

    handleChange = async (e) => {
        // console.log(e)
        await this.setState({
            validateotp: e.target.value
        })
        console.log(this.state.validateotp)
    }

    onSubmit = async () => {
        axios({
            method: 'post',
            url: 'https://eduinterview.appsfactory.io/api/rest/verifyotp',
            data: qs.stringify({
                code: this.state.validateotp
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then((responseData) => {
            console.log(responseData, "res")
            this.props.history.push({
                pathname: `/courses`,
                state: {
                    otp: responseData?.data?.loginVerifyOTP?.data,
                },
            });
        })
    }



    render() {
        const { validateotp, phone } = this.state;
        return (
            <Fragment>
                <>
                    <div className="otp">
                        <div className="otp-init">Verify OTP</div>
                        <p>Sent to {phone}</p>
                        <div className="">
                            <div class="otp-input">
                                <PhonelinkLockIcon className="otp-phone" />
                                <TextInput field="id" label="" placeholder="Code"  autoComplete="off" value={validateotp} className="otp-field"
                                    name="id" onChange={this.handleChange} />
                            </div>
                            <div className="otp-button">
                                <Button type="submit" className="otp-btn" onClick={this.onSubmit} >
                                    Verify
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            </Fragment >
        );
    }
}

export default withSnackbar(Otp)




