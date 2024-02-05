import * as React from "react";
// @ts-expect-error | The author doesn't include type declaration file.
import { EChart } from '@hcorta/react-echarts';
import PulseLoader from "react-spinners/PulseLoader";
import { onDarkMode, onLightMode } from '../common/DarkMode';
import { parseDomain, ParseResultType, fromUrl } from "parse-domain";

interface HistoryData {
    count: number,
    visited: number,
 }

const data: Map<string, HistoryData> = new Map();
let maxData: number = 0;

function grabData(chart: Chart) {
    chrome.history.search({
        text: '',
        maxResults: 10000,
    }, function (item) {
        for (let i = 0; i < item.length; ++i) {
            const current = item[i];
            const url = current.url;
            if (url === undefined)
                continue;

            const parsed = parseDomain(fromUrl(url));

            if (parsed.type !== ParseResultType.Listed)
                continue;

            const { hostname } = parsed;
            if (typeof hostname !== "string")
                continue;

            if (!data.has(hostname))
                data.set(hostname, { count: 0, visited: 0 });

            const cache: HistoryData | undefined = data.get(hostname);
            if (cache === undefined)
                continue;

            ++cache.count;
            cache.visited += current.visitCount ?? 0;
            data.set(hostname, cache);

            /* Just record for the max bar length  */
            {
                maxData = Math.max(maxData, cache.count);
                maxData = Math.max(maxData, cache.visited);    
            }
        }

        chart.setState({ loading: false });
    });
}

export default class Chart extends React.Component {
    state = {
        loading: true,
        color: '#eee',
    };

    componentDidMount(): void {
        grabData(this);
    }

    renderLoader = () => {
        const override = {
            display: "block",
            margin: "0 auto",
            color: "#fff",
        };

        onDarkMode(() => { this.setState({ color: '#eee' }); });
        onLightMode(() => { this.setState({ color: '#555' }); });

        return (
            <>
                <PulseLoader
                    loading={true}
                    color={this.state.color}
                    cssOverride={override}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </>);
    };

    render(): React.ReactNode {
        if (data.size === 0) {
            return (<h3>No data to display</h3>);
        }

        if (this.state.loading === true) {
            return this.renderLoader();
        }

        /* Auto scale width */
        const minWidth = 600;
        const labelWidth = 200;
        const width = Math.floor(maxData / 10) + labelWidth;
        document.body.style.setProperty('min-height', Math.max(minWidth, width).toString() + 'px');

        /* Auto scale height */
        const barSize = 31;
        const height = data.size * barSize;
        const minHeight = 800;
        const heightPx = Math.max(height, minHeight).toString() + 'px';

        /* Sort data nicely */
        const dataSorted = new Map([...data.entries()].sort((a, b) => a[1].visited - b[1].visited));
        const dataCount = [...dataSorted.values()].map(a => a.count);
        const dataVisited = [...dataSorted.values()].map(a => a.visited);

        return (
            <>
                <EChart
                    tooltip={{
                        trigger: 'item',
                        axisPointer: { type: 'cross' }
                    }}
                    style={{ height: heightPx }}
                    grid={{
                        left: '1%',
                        right: '2%',
                        top: '0%',
                        bottom: '1%',
                        containLabel: true,
                    }}
                    xAxis={{
                        type: 'value',
                        boundaryGap: [0, 0.01],
                    }}
                    yAxis={{
                        type: 'category',
                        max: data.size - 1,
                        data: [...dataSorted.keys()],
                    }}
                    series={[
                        {
                            name: 'visited',
                            type: 'bar',
                            data: dataVisited,
                        },
                        {
                            name: 'count',
                            type: 'bar',
                            data: dataCount,
                        },
                    ]}
                />
            </>
        )
    }
}
