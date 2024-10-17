import './pageTitle.css'
/* eslint-disable react/prop-types */

const PageTitle = ({title}) => {
    return (
        <div className="bobar-header">
            <p>{title}</p>
        </div>
    )
}

export default PageTitle;