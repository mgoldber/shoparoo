import React, { Component } from 'react';

import {
    Card,
    CardHeader,
    CardContent,
    Avatar,
    Typography
} from '@material-ui/core';


class StoreItem extends Component {
    render() {
        return (
            <Card>
                <CardHeader 
                    title="Heyyy"
                    subheader="My Name is Mark"
                />

                <CardContent>
                    TEST
                </CardContent>
            </Card>
        )
    }
}

export default StoreItem;