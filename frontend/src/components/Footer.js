import React from 'react'

function Footer() {
    return (
        <>
            <div bgColor='light' className='text-center text-lg-left'>
                <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    &copy; {new Date().getFullYear()} Developed By:{' '}
                    <a className='text-dark' >Roy Arad</a>
                </div>
            </div>
        </>
    )
}

export default Footer