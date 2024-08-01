import { Typography, Box } from '@mui/material';

const Header = ({ title, subtitle }) => {
    return (
        <Box mb="20px" display="flex" flexDirection="row">
            <Typography variant="h5" color="#434343" fontWeight="bold">
                {title}
            </Typography>
            <Typography sx={{ pl: 1 }} variant="h7" color="#434343">
                {subtitle}
            </Typography>
        </Box>
    );
};
export default Header;
