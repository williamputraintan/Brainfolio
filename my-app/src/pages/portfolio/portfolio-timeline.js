import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { HashLink as Link } from 'react-router-hash-link';

import DescriptionIcon from '@material-ui/icons/Description';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import ExtensionIcon from '@material-ui/icons/Extension';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

function showDescription() {
    if (true) {
        return (
            <TimelineItem>
                <TimelineSeparator>
                <Tooltip title="Description" placement="right">
                    <Link smooth to="#description">
                    <IconButton>
                        <DescriptionIcon />
                    </IconButton>
                    </Link>
                </Tooltip>
                    {/* <TimelineConnector /> */}
                </TimelineSeparator>
            </TimelineItem>
    )
    }
}

export default function PF_Timeline(){
    // var classes = useStyles();
    return (
        <div class='timeline'>
            <Timeline 
                align="right"
            >

                {showDescription()}
                
                <TimelineItem>
                    <TimelineSeparator>
                    <Tooltip title="Experience" placement="right">
                        <Link smooth to="#experience">
                            <IconButton>
                                <WorkIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                        {/* <TimelineConnector /> */}
                    </TimelineSeparator>
                    {/* <TimelineContent>Experience</TimelineContent> */}
                </TimelineItem>
                
                <TimelineItem>
                    <TimelineSeparator>
                    <Tooltip title="Education" placement="right">
                        <Link smooth to="#education">
                        <IconButton>
                            <SchoolIcon />
                        </IconButton>
                        </Link>
                    </Tooltip>
                    </TimelineSeparator>
                    {/* <TimelineContent>Education</TimelineContent> */}
                </TimelineItem>

                <TimelineItem>
                    <TimelineSeparator>
                    <Tooltip title="Skill" placement="right">
                        <Link smooth to="#skill">
                            <IconButton>
                                <ExtensionIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                        {/* <TimelineConnector /> */}
                    </TimelineSeparator>
                    {/* <TimelineContent>Skill</TimelineContent> */}
                </TimelineItem>

                <TimelineItem>
                    <TimelineSeparator>
                    <Tooltip title="Project" placement="right">
                        <Link smooth to="#project">
                        <IconButton>
                            <AssignmentTurnedInIcon />
                        </IconButton>
                        </Link>
                    </Tooltip>
                    </TimelineSeparator>
                </TimelineItem>
            </Timeline>
        </div>
        );
};