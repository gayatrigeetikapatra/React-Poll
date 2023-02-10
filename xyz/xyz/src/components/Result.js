import React, { useState, useEffect } from 'react'
import { useParams, Link, json } from 'react-router-dom';
import getDetailsByHooks from '../hooks/getDetailsByHooks';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJs.register(
  BarElement, CategoryScale, LinearScale)

export const Result = () => {
  const { id } = useParams();
  const [title, setTitle] = useState([]);

  const [detailsById] = getDetailsByHooks(id);
  useEffect(() => {
    const data = () => {
      if (detailsById.data) {
        setTitle(detailsById.data.data['options']);
        console.log('----', detailsById.data.data['options']);
      }
    };
    data();

  }, [detailsById.data]);

  console.log('--', title);

  const result = title.map((item, index) => {
    return (
      <h5 key={index}>{item.vote}</h5>
    )
  })
  console.log('--//', title);

  let data = {
    labels: title?.map(x => x.vote),
    datasets: [{
      label: '# of Votes',
      data: title?.map(x => x.vote),
      backgroundColor: [
        'rgb(147,112,219)',
        'rgb(123,104,238)',
        'rgb(106,90,205)',
        'rgb(72,61,139)',
        'rgb(102,51,153)',
        'rgb(138,43,226)'
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

  let options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    legend: {
      labels: {
        fontSize: 10
      }
    }
  }

  return (
    <div className='container'>
      <Link to='/homes'>
        <button
          className='btn btn-primary'>Back</button>
      </Link>
      {result}
      <Bar
        data={data}
        height={0}
        options={options}>
      </Bar>
    </div >
  )
}

export default Result;