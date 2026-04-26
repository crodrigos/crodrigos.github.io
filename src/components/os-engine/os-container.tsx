import React from 'react'
import { OSNavbar } from './os-navbar'

import './styles.css'

export const OSContainer : React.FC = () => {

    return <div className='bg-[#008080] h-lvh flex flex-col'>
        <div className='flex-1'>
        </div>
        <OSNavbar></OSNavbar>
    </div>

}