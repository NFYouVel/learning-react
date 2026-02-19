import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { getPostDetails } from "../utils/api";
import Paper from '@mui/material/Paper';
import { Card, CardContent, Typography } from "@mui/material";

export default function PostDetails() {
    type PostDetails = {
        id: string,
        title: string,
        content: string,
        status: string,
        userId: string,
        user: {
            name: string
        },
        createdAt: string,
        updatedAt: string,
    }

    const { id } = useParams();
    const [postDetails, setPostDetails] = useState<PostDetails>()

    useEffect(() => {
        getPostDetails(id ?? '').then((res) => {
            setPostDetails(res)
        })
    }, [])

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Paper elevation={24} sx={{ maxWidth: "50%"} }>
                <Card sx={{ maxWidth: "100%", bgcolor: 'grey.200', height: "100%" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {postDetails?.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {postDetails?.content}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {postDetails?.createdAt}
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
        </div>
    )
}