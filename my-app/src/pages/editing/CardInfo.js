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
    const fakedata = props.datalist;
    const title = props.title;
    const fieldNames = props.fieldNames;
    var count = 0;

    return(
    <Card className={useStyles.cardRoot}>
        <CardContent>
            <Typography className={useStyles.title} color="textSecondary" gutterBottom>
                Your {title}
            </Typography>
            <List>
                {/* will use data from database */}
                {fakedata.map(res=>(
                <div>
                <ListItem style={{ display:'inline'}}>
                    <div style={{float:'right'}}> <EditButton /> </div>
                    {fieldNames? 
                        Object.entries(res).map(([key,value],i) => ((value!=="") &&  <div> {fieldNames[i]} : {value} </div>)) 
                        : Object.entries(res).map(([key,value],i) => ((value!=="") &&  <div> {value} </div>))
                    }
                </ListItem> 
                {++count < fakedata.length? <Divider/>:null}
                </div>
                ))}
            </List>
        </CardContent>
    </Card>)
}

