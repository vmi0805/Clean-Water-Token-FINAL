import React from "react";
import "../CampaignCard.css";
// import { ButtonGroup , Button } from 'reactstrap';


const CampaignCard1 = props => (

  <div className="card">
    <div className="img-container">
      <img alt={props.name} src={require('./cambodia.jpeg')} />
    </div>
    
    <div className="content">
      <ul>
        <li>
          <div className="adjust-container">
            <div className="adjust"><b>Name:</b></div><div className="adjust2">{props.name}</div>
          </div>
        </li>
        <li>
          <div className="adjust-container">
            <div className="adjust"><b>Location:</b></div><div className="adjust2">{props.location}</div>
          </div>
        </li>
        <li>
          <div className="adjust-container">
            <div className="adjust"><b>Approval Status:</b></div><div className="adjust2">{props.approvalStatus}</div>
          </div>
        </li>

        <li>
          <div className="adjust-container">
            <div className="adjust">
                <b>Votes Received:</b>
                <i>
                  <br></br>
                  75 votes for
                  <br></br>
                  approval
              </i>
            </div>
            <div className="adjust3"><br></br>{props.votes}
            </div>
          </div>
        </li>

        <li>
          <div className="adjust-container">
            <div className="adjust"><b>Funding Received:</b></div><div className="adjust2">{props.balance}</div>
          </div>
        </li>  
      </ul>

      <div className="adjust4">
        <h1><b>To change donor...</b></h1>
          <br></br>
        <h2>
          <i>Login to MetaMask, then refresh page</i>
        </h2>
      </div>

      <ul>
        <li>
          <div className="adjust-container">
            <div className="adjust"><b>Account ether balance:</b></div><div className="adjust2">{props.ether}</div>
          </div>
        </li>
        <li>
          <div className="adjust-container">
            <div className="adjust"><b>Account token balance:</b></div><div className="adjust2">{props.tokens}</div>
          </div>
        </li>
      </ul>

    </div>

  </div>

);

export default CampaignCard1;
