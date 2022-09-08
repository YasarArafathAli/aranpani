import React, { FC } from 'react'
import "./appHeader.scss"

interface AppHeaderProps {
    title: string;
    setFormVisible: Function;
    disableAdd?:boolean
}

const AppHeader: FC<AppHeaderProps> = ({title, setFormVisible, disableAdd}) => {

    return (
        <h1 className="font-bold">
            {title}
            {!disableAdd && <span className="add-project">
              <i className="icon-add-2" onClick={()=>setFormVisible(true)} />
            </span>}
        </h1>
    )
}

export default AppHeader;