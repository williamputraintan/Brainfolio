import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import EditButton from './EditButton.js'

import {useStyles} from './Styles';

export default function cardInfo(props){
    const title = props.title;
    const fieldNames = props.fieldNames;
    var path =  props.path;
    var data = props.datalist;
    //used in Divider usage
    var count = 0;

    //disregard unwanted props
    function checkUnwanted(key,value){
        return (key!=="_id" && key!=="username" && key!=="__v" && key!=="onGoing" && value!=="");
    }

    //pass to parent component
    const myCallback = (dataFromChild) => {
        props.toEdit(dataFromChild)
    }

    return(
    <Card className={useStyles.cardRoot}>
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
                    <div style={{float:'right'}}> <EditButton path={path} id={res._id}  toEdit={myCallback} />  </div>
                        {fieldNames? 
                        Object.entries(res).map(([key,value],i) => (checkUnwanted(key,value) && <div> {fieldNames[key]} : {value} </div>)) 
                        : Object.entries(res).map(([key,value],i) => (checkUnwanted(key,value) && <div> {value} </div>))
                        }
                    </ListItem> 
                    {++count < data.length? <Divider/>:null}
                </div>
                ))}
            </List>
        </CardContent>
    </Card>)
}
