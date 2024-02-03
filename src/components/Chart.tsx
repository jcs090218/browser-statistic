// @ts-expect-error | The author doesn't include type declaration file.
import { EChart } from '@hcorta/react-echarts';

function Chart() {
    let sites;  // Domains
    let data;   // count

    function grabData() {
        chrome.history.search({
            text: '',
        }, 
        function (item) {
            for (let i = 0; i < item.length; ++i) {
                let url = item[i].url;
            }
        });

        return '';
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
