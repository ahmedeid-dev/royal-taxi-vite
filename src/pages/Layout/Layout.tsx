import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </React.Fragment>
    );
}
