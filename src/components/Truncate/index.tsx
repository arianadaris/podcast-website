import Typography, {TypographyProps} from '@mui/material/Typography';

type TruncateProps = TypographyProps &{
    children: string;
    limit?: number;
};

const Truncate = ({ children, limit = 2, ...props }: TruncateProps) => {
    return (
        <Typography 
            {...props}
            sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: limit,
                WebkitBoxOrient: 'vertical',
            }}
        >
            {children}
        </Typography>
    );
};

export default Truncate;