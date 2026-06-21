import { Plugin } from "chart.js";

const CrosshairPlugin: Plugin<'line'> = {
    id: 'crosshair',
    afterDatasetsDraw(chart) {
        const { ctx, tooltip, chartArea } = chart
        if (!tooltip?.getActiveElements().length) return

        const activePoint = tooltip.getActiveElements()[0]
        const x = activePoint.element.x

        ctx.save()
        ctx.beginPath()
        ctx.moveTo(x, chartArea.top)
        ctx.lineTo(x, chartArea.bottom)
        ctx.lineWidth = 1
        ctx.strokeStyle = 'rgba(53, 162, 235, 0.5)'
        ctx.setLineDash([4, 4])
        ctx.stroke()
        ctx.restore()
    }
}

export default CrosshairPlugin