import React from 'react'

export default function ResultsModal({visible, toggleVisible,results}) {

  return (
    visible && <div className='overlay flex justify-center items-center bg-white bg-opacity-50 absolute h-screen w-screen top-0 left-0 text-xl'>
                    <div className='bg-white transition border shadow rounded p-5 text-xl text-slate-700'>
        <div className="modal-header flex justify-between items-center">
        <div className='text-center'>Scorecard</div>
            <div className="">
            <button className='hover:bg-slate-200 rounded-full p-2'  onClick={toggleVisible}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                          <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                      </svg>

                  </button>
            </div>
        </div>
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
    </div>
  )
}
