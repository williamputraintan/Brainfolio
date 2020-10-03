import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

import IconButton from '@material-ui/core/IconButton';


export default function PF_Timeline(){
    // var classes = useStyles();
        return (
            <div class='timeline'>
                <Timeline align="right">
                <TimelineItem>
                    <TimelineSeparator>
                    <IconButton><TimelineDot /></IconButton>
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Description</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                    <IconButton><TimelineDot /></IconButton>
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Experience</TimelineContent>
                </TimelineItem>
                
                <TimelineItem>
                    <TimelineSeparator>
                    <IconButton><TimelineDot /></IconButton>
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Education</TimelineContent>
                </TimelineItem>

                <TimelineItem>
                    <TimelineSeparator>
                    <IconButton><TimelineDot /></IconButton>
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Skill</TimelineContent>
                </TimelineItem>

                <TimelineItem>
                    <TimelineSeparator>
                    <IconButton><TimelineDot /></IconButton>
                    </TimelineSeparator>
                    <TimelineContent>Project</TimelineContent>
                </TimelineItem>
                </Timeline>
            </div>
        );
};