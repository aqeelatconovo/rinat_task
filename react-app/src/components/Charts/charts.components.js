import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Chart} from 'chart.js'
import './charts.style.css'
import axios from "axios/index";
import {chartsActions} from "../../actions";


const componentClicked = (response) => {
    console.log(response);
}

class ChartsPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draw_canvas :false,
            charts_array:[]
        }
    }

    componentDidMount() {
        this.getCharts()
    }

    componentWillReceiveProps(nextProps) {
             if(nextProps.chartReducer ) {
                this.componentDidMount()
             }
    }



    addChart = () => {
        axios.post(process.env.REACT_APP_API_URL + "/add_charts", )
            .then(response => {
                console.log(response.data);
                if (response.data && response.data.success) {
                    const {dispatch} = this.props;
                    dispatch(chartsActions.fireChartUpdated(true));

                }
            })
            .catch((error) => {
                console.log(error.response)
            });

    }
    getCharts = () =>{
        axios.get(process.env.REACT_APP_API_URL + "/charts", )
            .then(response => {
                console.log(response.data);
                if (response.data && response.data.success) {

                    this.setState({
                        charts_array: response.data.charts
                    },function () {
                        this.drawChart();
                    })
                }
            })
            .catch((error) => {
                console.log(error.response)
            });
    }

    drawChart = () => {

        for(let i=0; i<this.state.charts_array.length;i++) {

            console.log('myChart' + i)

            var ctx = document.getElementById('barChart' + i);
            console.log("ctx")
            console.log(ctx)


            var myChart = new Chart(ctx, {

                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: this.state.charts_array[i].bar_chart_data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                }
            });

            var ctx1 = document.getElementById('pieChart' + i);

            var myPieChart = new Chart(ctx1, {
                type: 'pie',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: this.state.charts_array[i].pie_chart_data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                }
            });
        }


        this.setState({
            draw_canvas:true
        })
    }


    render() {
        return (
            <div className="bodyDiv container">
                <div className="text-center"><h1>Charts </h1></div>
                < hr/>
                {this.state.charts_array.length>0 ? this.state.charts_array.map((chart, index) =>
                <span>
                    <div className="row ">
                        <span>{index + 1}</span>

                        <div className="charts_width ">
                            <canvas id={"barChart" + index} width="100" height="100"></canvas>
                        </div>
                        <div className="charts_width ml-2">
                            <canvas id={"pieChart" + (index)} width="100" height="100"></canvas>
                        </div>
                    </div>
                    < hr/>
                </span>
                ):
                    <div className="text-center"><h6>No charts to show</h6></div>
                }


                <div className="text-center ">
                    <button className="mb-5 " onClick={this.addChart}>Add more</button>
                </div>


            </div>

        );
    }

}

function mapStateToProps(state) {
    const chartReducer = state.chartReducer;
    return {
        chartReducer
    };
}
const connectChartsPageComponent = connect(mapStateToProps)(ChartsPageComponent);
export {connectChartsPageComponent as ChartsPageComponent};