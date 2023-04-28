import { Grid, Typography, TextField, Button, InputAdornment } from '@mui/material';
import DropdownMenuitem from './DropdownMenuitem';
import SearchIcon from '@mui/icons-material/Search';

export default function Menubar() {
    return (
        <Grid container p={2} justifyContent="space-between" alignItems="center" sx={{
            backgroundColor: (theme) => theme.palette.background.paper,
            color: (theme) => theme.palette.text.primary
        }}>
            <Typography variant="h3">Ararastore</Typography>
            <TextField
                variant="outlined"
                sx={{
                    input: {
                        color: (theme) => theme.palette.common.black
                    }
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon color="secondary"></SearchIcon>
                        </InputAdornment>
                    ),
                }}
            ></TextField>
            <Grid sx={{ display: "flex" }}>
                <Button href="/products">
                    <Typography>Home</Typography>
                </Button>
                <Button href="/products">
                    <Typography>Muié</Typography>
                </Button>
            </Grid>
            <Grid sx={{ display: "flex" }}>
                <Button color="secondary"><Typography color="text.primary">Entrar</Typography></Button>
                <Button color="secondary"><Typography color="text.primary">Carrinho</Typography></Button>
            </Grid>
        </Grid >
    )
}