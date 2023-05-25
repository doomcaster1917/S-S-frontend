import React, {useState, useEffect} from 'react';



const EnemyBar = (props) => {

    const[activeItem, setItem] = useState(false)


    useEffect(()=>{
    setItem(props.enemyChoice)
    }, [props])


    // if(props.enemy_choice){
    //      let enemy_choice = document.getElementById(`${props.enemy_choice}-enemy`)
    //      enemy_choice.className = "game-picture_animate"
    //    }


    return (
        <div className="game-bar">
             <div className="player-bar">
                 <img className="avatar" src={props.enemy_avatar}></img>
                 <div className="username"></div>
             </div>
            <div className="set-bar">
                <img  className="game-picture" style={{background: activeItem == 'stone' ? "red": "azure"}} src={require("../../../images/stone.png")}></img>
                <img  className="game-picture" style={{background: activeItem == 'scissors' ? "red": "azure"}} src={require("../../../images/scissors.png")}></img>
                <img  className="game-picture" style={{background: activeItem == 'paper' ? "red": "azure"}} src={require("../../../images/paper.png")}></img>
            </div>
        </div>
    );
};

export default EnemyBar;