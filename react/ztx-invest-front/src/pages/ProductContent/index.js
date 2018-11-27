import React from 'react';
import './index.css';
import RiskA from '../../images/a.png';
import RiskB from '../../images/b.png';
import RiskC from '../../images/c.png';

class ProductContent extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
        <div className="Tender">
        	<div className="TenderItem">
        		<div className="mainItem">
		        	<div className="flexBox TenderItemTop">
		        		<div className="left">Pinjaman 137****2323</div>
		        		<div className="right">
		        			<img className="riskImg" src={RiskA} />
		        			Grade
		        		</div>
		        	</div>
                    <div className="flexBox TenderItemHead">
                        <div className="left">1222</div>
                        <div className="right">
                            22222
                        </div>
                    </div>
		        </div>
	        </div>
        </div>
        )
    }
}

export default ProductContent;