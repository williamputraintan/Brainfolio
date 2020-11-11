import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import EditButton from './EditButton.jsx'
import {useStyles} from './Styles';

export default function cardInfo(props){
    const title = props.title;
    const fieldNames = props.fieldNames;
    var data = props.datalist;

    //Used in Divider usage
    var count = 0;

    //Disregard unwanted props
    function checkUnwanted(key,value){
        return (key!=="_id" &&
         key!=="username" && 
         key!=="__v"  && 
         (key!=="sectionTitle" && key!=="type") && 
         key!=="onGoing" && 
         value!=="" &&
         value!==[] &&
         key !== "projectFileName" &&
         key !== "contributor");
    }

    //Pass edit id to parent component
    const myEditCallback = (idReceived) => {
        props.toEdit(idReceived)
    }

    //Pass delete id to parent component
    const myDeleteCallback = (idReceived) => {
        props.toDelete(idReceived)
    }

    function handleDate(date){
        var formatDate = date.substring(0,10);
        return formatDate;
    }

    function handleValue(key,value,res){
        if(key==="startDate" || key==="endDate"){
            return handleDate(value);
        } else if(key==='isPublic'){
            if (value===true){
                return "Public"
            }else{
                return "Private"
            }
        }else{
            return value;
        }
    }

    return(
    <Card className={useStyles.cardRoot} style={{maxHeight:'600px', overflowY:'scroll'}}>
        <CardContent>
            <Typography className={useStyles.title} color="textSecondary" gutterBottom>
                Your {title}
            </Typography>
            <List>
                {data.map(res=>(
                    <div>
                        {/* EndDate value onGoing when onGoing is checked */}
                        <div style={{display:'none'}}>{res.hasOwnProperty('onGoing') && res.onGoing?res.endDate="On Going" :null}</div>
                        <ListItem style={{ display:'inline'}}>
                        <div style={{float:'right'}}> <EditButton id={res._id}  toEdit={myEditCallback} toDelete={myDeleteCallback} />  </div>
                            {Object.entries(res).map(([key,value],i) => (checkUnwanted(key,value) && <div> {fieldNames[key]} : {handleValue(key,value,res)} </div>))}
                        </ListItem> 
                        {++count < data.length? <Divider/>:null}
                    </div>
                ))}
            </List>
        </CardContent>
    </Card>)
}
