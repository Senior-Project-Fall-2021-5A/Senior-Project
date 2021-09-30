import React from 'react'

const AccountMenuItems= [
    {
        title: 'General Information',
        url: './generalinformation',
        cName:'account-nav-item'
    },
    {
        title: 'Reports',
        url: '/reports',
        cName:'account-nav-item'
    },
    {
        title: 'Inbox',
        url: '/inbox',
        cName:'account-nav-item'
    },
    {
        title: 'Sign Up',
        url: '#',
        cName:'account-nav-item'
    }
]
function AccountNav() {
    return (
        <div className='account-vertical-nav'>
            <ul className='account-navmenu' style={{listStyle:'none', textAlign:"left"}}>
                    {AccountMenuItems.map((item, index) => {
                        return (
                            <li classname='nav-list'key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}

export default AccountNav
