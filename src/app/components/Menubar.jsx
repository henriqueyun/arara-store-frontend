import { Grid, Typography, TextField, Button } from '@mui/material';
import DropdownMenuitem from './DropdownMenuitem';

export default function Menubar() {
    return (
        <Grid container p={2} justifyContent="space-between" alignItems="center" sx={{
            backgroundColor: (theme) => theme.palette.background.paper,
            color: (theme) => theme.palette.text.primary
        }}>
            <Typography variant="h3">Ararastore</Typography>
            <TextField variant="filled"></TextField>
            <Grid sx={{ display: "flex" }}>
                <DropdownMenuitem color="secondary">
                    Home
                </DropdownMenuitem>
                <DropdownMenuitem color="secondary">
                    Muié
                </DropdownMenuitem>
            </Grid>
            <Grid sx={{ display: "flex" }}>
                <Button color="secondary"><Typography color="text.primary">Entrar</Typography></Button>
                <Button color="secondary"><Typography color="text.primary">Carrinho</Typography></Button>
            </Grid>
        </Grid >
    )
}