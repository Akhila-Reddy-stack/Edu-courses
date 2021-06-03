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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import GroupIcon from '@material-ui/icons/Group';
import StarIcon from '@material-ui/icons/Star';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

class Chapters extends PureComponent {
    constructor(props) {
        super(props)
        this.slider = React.createRef();
        this.state = {
            data: [],
            loading: true,
            bannerImgs: [],
            autoplay: true,
            Chapters: []
        }
    }

    componentDidMount = async () => {
        console.log(this.props, "chap")
        console.log(this.props, "props")
        if (this.props.location.state != undefined && this.props.location.state) {
            console.log("oooooo");
            await this.setState({
                contentitem: this.props.location.state?.contentitem,
                token: this.props.location.state?.token,
            });
        }
        console.log(this.state)
        var edu;
        axios({
            method: 'get',
            url: ' https://eduinterview.appsfactory.io/api/rest/courses/1',
            headers: {
                'Authorization': 'Bearer ' + this.state.token
            }
        }).then(async (responseData) => {
            console.log(responseData, "res")
            await this.setState({
                Chapters: responseData.data.eduinterview_courses

            })
            edu = responseData.data.eduinterview_courses
        })
        await this.setState({
            Chapters: edu
        })
        await this.forceUpdate();
        console.log(this.state)
    }


    render() {
        const { data, Chapters } = this.state;
        console.log(this.state)
        console.log(this.props)
        return (
            <Fragment>
                <>
                    <div className="Content">
                        {Chapters?.map(chap => (
                            <div>
                                <img src={`https://res.cloudinary.com/kraftycrux/image/upload/w_160,h_224,dpr_auto/${chap.big_image}`} class="con-img-bg" />
                                <div className="content-inner">
                                    <ArrowBackIosIcon className="content-arrow" />
                                    <div className="content-group"><span class="con-sell">BESTSELLER</span></div>
                                    <div className="content-text">{chap.name}</div>
                                    <div className="">
                                        <div className=""><GroupIcon className="content-groupicon" />
                                            <span className="content-reviews">{chap.meta_data.students} </span>
                                        </div>
                                        <div className=""><StarIcon className="content-stars" />
                                            <span className="content-ratings">{chap.meta_data.ratings}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-reels">
                                    <div className="content-courses-list">Courses Content</div>
                                    {chap?.chapters?.map(reel => (
                                        <div className={`content-list-${reel.id}`}>
                                            <div className={`con-id-${reel.id}`}>0{reel.id}</div>
                                            <div className={`con-chap-${reel.id}`}>
                                                <div className={`con-time-details-${reel.id}`}>{reel.time}</div>
                                                <div className={`con-name-details-${reel.id}`}>{reel.name}</div>
                                            </div>
                                            <div className={`con-num-${reel.id}`} >
                                                <a href={reel.url}>
                                                    <div class="link-arrow">
                                                    <ArrowRightIcon className="content-play" />
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </>
            </Fragment >
        );
    }
}

export default withSnackbar(Chapters)




