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
import face from '../../Images/face.jpg'
import ClearAllIcon from '@material-ui/icons/ClearAll';
import SearchIcon from '@material-ui/icons/Search';

class Courses extends PureComponent {
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
                token: this.props.location.state?.otp?.token,

            });
        }

        axios({
            method: 'get',
            url: 'https://eduinterview.appsfactory.io/api/rest/courses/',
            headers: {
                'Authorization': 'Bearer ' + this.state.token
            }
        }).then((responseData) => {
            console.log(responseData, "res")
            this.setState({
                Courses: responseData?.data?.eduinterview_courses
            })

        })
        console.log(this.state.Courses)

    }

  
    onSubmit = async (item) => {
        console.log(item)
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
                pathname: `/chapter`,
                state: {
                    token:this.state.token,
                    courseId:item.id
                },
              });
        })
    }

    render() {
        const { data, Courses,contentitem } = this.state;
        console.log(this.state)
        return (
            <Fragment>
                <>
                    <div className="courses">
                        <div className="">
                            <ClearAllIcon className="courses-clear" />
                            <img src={face} className="courses-profile" />
                        </div>
                        <div className="courses-init">Hey Chang,</div>
                        <p class="courses-para">What do you want to learn?</p>
                        <div className="">
                            <SearchIcon className="search-courses" />
                            <TextInput field="id" label="" autoComplete="off" placeholder="Search for courses" className="courses-input"
                                name="id" onChange={this.handleChange} />
                        </div>
                        <div className="">
                            <div className="courses-list">Courses</div>
                            <div className="courses-all">See All</div>
                        </div>
                        {Courses?.map(item => (
                             <Button type="submit" onClick={() =>this.onSubmit(item)} >
                             <div className="" type="submit" >
                                <div className={`courses-content-${item.id}`}>
                                    <img  className={`courses-img-${item.id}`}  src={`https://res.cloudinary.com/kraftycrux/image/upload/w_160,h_224,dpr_auto/${item.image}`}  />
                                    <div  className={`courses-text-${item.id}`} >{item.name}</div>
                                    <p  className={`courses-hours-${item.id}`} >{item.time}</p>
                                </div>
                            </div>
                         </Button>
                        ))}
                    </div>
                </>
            </Fragment >
        );
    }
}

export default withSnackbar(Courses)




