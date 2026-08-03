export function MetricCard({title, value}: { title: string, value: number }) {
    return (
        <div className="metricCard">
            <p>{title}</p>
            <h2>{value}</h2>
        </div>
    );
}