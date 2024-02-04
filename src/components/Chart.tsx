import { useState } from 'react';
// @ts-expect-error | The author doesn't include type declaration file.
import { EChart } from '@hcorta/react-echarts';
import PulseLoader from "react-spinners/PulseLoader";
import { onDarkMode, onLightMode } from '../common/DarkMode';
import extractDomain from 'extract-domain';

const data: Map<string, number> = new Map();

function grabData(setLoading: any) {
    chrome.history.search({
        text: '',
        maxResults: 10000,
    },
        function (item) {
            for (let i = 0; i < item.length; ++i) {
                const url = item[i].url;
                if (url === undefined)
                    continue;

                const domain = extractDomain(url);
                if (domain !== typeof (String))
                    continue;

                if (!data.has(domain))
                    data.set(domain, -1);

                let count: number | undefined = data.get(domain);
                if (count === undefined)
                    continue;

                ++count;
                data.set(domain, count);
            }

            setLoading(false);
        });
}

function RenderLoader() {
    const [color, setColor] = useState("#eee");

    const override = {
        display: "block",
        margin: "0 auto",
        color: "#fff",
    };

    onDarkMode(() => { setColor('#eee'); });
    onLightMode(() => { setColor('#555'); });

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
    const [loading, setLoading] = useState(true);

    if (loading === true) {
        grabData(setLoading);
        return RenderLoader();
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
                    data: [...data.keys()]
                }}
                series={[
                    {
                        name: '2011',
                        type: 'bar',
                        data: [...data.values()]
                    },
                ]}
            />
        </>
    )
}

export default Chart;
