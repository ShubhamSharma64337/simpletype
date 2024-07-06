import React, { useState } from 'react'
import LetterButton from './LetterButton'
import SpaceBar from './SpaceBar'
export default function Keyboard({pressed}) {
  return (
    <div className='grid mt-10 grid-rows-5 gap-4'>
        <div className='row-1 grid grid-cols-12'>
            <LetterButton letter={'Q'} pressed={pressed}></LetterButton>
            <LetterButton letter={'W'} pressed={pressed}></LetterButton>
            <LetterButton letter={'E'} pressed={pressed}></LetterButton>
            <LetterButton letter={'R'} pressed={pressed}></LetterButton>
            <LetterButton letter={'T'} pressed={pressed}></LetterButton>
            <LetterButton letter={'Y'} pressed={pressed}></LetterButton>
            <LetterButton letter={'U'} pressed={pressed}></LetterButton>
            <LetterButton letter={'I'} pressed={pressed}></LetterButton>
            <LetterButton letter={'O'} pressed={pressed}></LetterButton>
            <LetterButton letter={'P'} pressed={pressed}></LetterButton>
            <LetterButton letter={'['} pressed={pressed}></LetterButton>
            <LetterButton letter={']'} pressed={pressed}></LetterButton>
        </div>
        <div className='row-1 grid grid-cols-12'>
            <LetterButton letter={'A'} pressed={pressed}></LetterButton>
            <LetterButton letter={'S'} pressed={pressed}></LetterButton>
            <LetterButton letter={'D'} pressed={pressed}></LetterButton>
            <LetterButton letter={'F'} pressed={pressed}></LetterButton>
            <LetterButton letter={'G'} pressed={pressed}></LetterButton>
            <LetterButton letter={'H'} pressed={pressed}></LetterButton>
            <LetterButton letter={'J'} pressed={pressed}></LetterButton>
            <LetterButton letter={'K'} pressed={pressed}></LetterButton>
            <LetterButton letter={'L'} pressed={pressed}></LetterButton>
        </div>
        <div className='row-1 grid grid-cols-12'>
            <LetterButton letter={'Z'} pressed={pressed}></LetterButton>
            <LetterButton letter={'X'} pressed={pressed}></LetterButton>
            <LetterButton letter={'C'} pressed={pressed}></LetterButton>
            <LetterButton letter={'V'} pressed={pressed}></LetterButton>
            <LetterButton letter={'B'} pressed={pressed}></LetterButton>
            <LetterButton letter={'N'} pressed={pressed}></LetterButton>
            <LetterButton letter={'M'} pressed={pressed}></LetterButton>
            <LetterButton letter={','} pressed={pressed}></LetterButton>
            <LetterButton letter={'.'} pressed={pressed}></LetterButton>
        </div>
        <div className='row-1 grid grid-cols-12'>
            <SpaceBar pressed={pressed}></SpaceBar>
        </div>
  </div>
  )
}
