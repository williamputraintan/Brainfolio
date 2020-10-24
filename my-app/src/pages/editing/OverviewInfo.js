import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import {useStyles} from './Styles.js';

export default function OverviewInfo(props){
    var data = props.data;
    var fieldNames =  props.fieldNames;
    var count = 0;
    const classes = useStyles();

  
     //disregard unwanted props
     function checkUnwanted(key,value){
        return (key!=="_id" && key!=="username" && key!=="__v"  && (key!=="sectionTitle" && key!=="type") && key!=="onGoing" && value!=="" && value!==[]);
    }
    
    
    return (
        <div>
            <List>
                {data.map(res=>(
                    <div>
                    {/* EndDate value onGoing when onGoing is checked */}
                    <div style={{display:'none'}}>{res.hasOwnProperty('onGoing') && res.onGoing?res.endDate="On Going" :null}</div>
                    <ListItem style={{ display:'inline'}} >
                        {Object.entries(res).map(([key,value],i) => (checkUnwanted(key,value) && 
                            <div>
                                <Hidden smDown>
                                    <div className={classes.fieldInfo} >
                                        <div className={classes.fieldKey}> 
                                            {fieldNames[key]} : 
                                        </div> 
                                        <div className={classes.fieldValue}>
                                            {value} 
                                        </div>
                                    </div>
                                </Hidden>
                                <Hidden mdUp>
                                    <div> {fieldNames[key]} : {value} </div>
                                </Hidden>
                            </div>)) }
                    </ListItem> 
                    {++count < data.length? <Divider/>:null}
                    </div>
                ))}
            </List>
        </div>
    )
}