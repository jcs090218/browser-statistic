import { useState } from 'react';
// @ts-expect-error | The author doesn't include type declaration file.
import { EChart } from '@hcorta/react-echarts';
import PulseLoader from "react-spinners/PulseLoader";
import { onDarkMode, onLightMode } from '../common/DarkMode';

let sites: any = undefined;  // Domains
let data: any = undefined;   // count

// function grabData() {
//     console.log(chrome.history);
//     chrome.history.search({
//         text: '',
//     },
//         function (item) {
//             console.log(item);
//             for (let i = 0; i < item.length; ++i) {
//                 //let url = item[i].url;
//             }
//         });
// }

// grabData();

const override = {
    display: "block",
    margin: "0 auto",
    color: "#fff",
};

function RenderLoader(color) {
    return (
        <>
            <PulseLoader
                loading={true}
                color={color}
                cssOverride={override}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </>);
}

function Chart() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#eee");

    onDarkMode(() => { setColor('#eee'); });
    onLightMode(() => { setColor('#555'); });

    if (loading === true) {
        return RenderLoader(color);
    }
    return (
        <>
            <EChart
                grid={{
                    left: '1%',
                    right: '1%',
                    top: '1%',
                    bottom: '1%',
                    containLabel: true,
                }}
                xAxis={{
                    type: 'value',
                    boundaryGap: [0, 0.01]
                }}
                yAxis={{
                    type: 'category',
                    data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
                }}
                series={[
                    {
                        name: '2011',
                        type: 'bar',
                        data: [18203, 23489, 29034, 104970, 131744, 630230]
                    },
                ]}
            />
        </>
    )
}

export default Chart;
