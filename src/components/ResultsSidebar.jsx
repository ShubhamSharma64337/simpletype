import React from 'react'

export default function ResultsSidebar({results}) {
  return (
    <div className='bg-white hover:scale-110 transition border border-purple-500 rounded p-5 text-xl text-slate-700 h-4/5 overflow-y-auto'>
        <div className='text-center'>Scorecard</div>
        <table cellPadding={10} cellSpacing={2}>
            <thead className='font-medium'>
                <tr>
                <th>S.No</th>
                <th>Gross</th>
                <th>Net</th>
                <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {
                    results ? results.map((val,index)=>{
                        return <tr key={index}>
                                <td>{index+1}.</td>
                                <td>{parseInt(val.gross)}</td>
                                <td>{parseInt(val.net)}</td>
                                <td>{val.timeTaken < 60 ? val.timeTaken : parseInt(val.timeTaken/60) + 'm ' + parseInt(val.timeTaken%60) + ' s'}</td>
                            </tr>
                    }) : <tr>
                        <td colSpan={4} align='center'>No Scores Yet</td>
                    </tr>
                }
            </tbody>
        </table>
    </div>
  )
}
