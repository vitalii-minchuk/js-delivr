export const getHitsChartData = (hits, label = '', backgroundColor = 'skyblue') => {
  const result = {
    labels: [],
    datasets: [
      {
        data: [],
        label,
        backgroundColor,
      }
    ],
  }

  if (hits) {
    Object.entries(hits).forEach(el => {
      result.labels.push(el[0])
      result.datasets[0].data.push(el[1])
    })
  }

  return result
}
