import { Grid, Typography, TextField, Button } from '@mui/material';
import DropdownMenuitem from './DropdownMenuitem';

export default function MUIMenubar() {
    return (
        // todo: ajustar cores no tema padrão (importar theme e por de referência?)
        <Grid container p={2} justifyContent="space-between" alignItems="center" sx={{ backgroundColor: "#323232", color: "white" }}>
            <Typography variant="h3">Ararastore</Typography>
            <TextField size="small" variant="filled"></TextField>
            <Grid sx={{ display: "flex" }}>
                <DropdownMenuitem>
                    Home
                </DropdownMenuitem>
                <DropdownMenuitem>
                    Muié
                </DropdownMenuitem>
            </Grid>
            <Grid sx={{ display: "flex" }}>
                <Button>Entrar</Button>
                <Button>Carrinho</Button>
            </Grid>
        </Grid>
    )
}