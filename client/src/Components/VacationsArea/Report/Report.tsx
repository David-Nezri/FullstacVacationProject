import "./Report.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import vacationsService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import usePageTitle from "../../../Utils/usePageTitle";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'bottom' as const,
        },
        title: {
            display: true,
            text: 'Vacations Report',
            color: 'black',
            padding: 40,
            font: {
                size: 20
            }
        },
    },
    redraw: true
};
export

    function Report(): JSX.Element {

        usePageTitle("Report");   

    const navigate = useNavigate()
    const [labels, setLabels] = useState<string[]>([])
    const [followersCount, setFollowersCount] = useState<number[]>([])

    const data = {
        labels,
        datasets: [
            {
                label: 'No. of followers',
                data: followersCount,
                backgroundColor: 'orange',
            }
        ],
    };

    useEffect(() => {
        vacationsService.getReportData().then(res => {
            const vacationsLabels = res.map(v => v.destination)
            setLabels(vacationsLabels)
            const vacationFollowersCount = res.map(v => v.followersCount)
            setFollowersCount(vacationFollowersCount)
        }).catch(err => {
            notifyService.error(err)
        })
    }, [])

    return (
        <div className="Report">
            <div className="action-nav">
                <button onClick={() => navigate('/home')}>
                    <ChevronLeftIcon sx={{ color: "black", fontSize: 20, marginRight: "8px" }} />
                    Back
                </button>
            </div>
            <Bar options={options} data={data} />
        </div>
    );
}

export default Report;
