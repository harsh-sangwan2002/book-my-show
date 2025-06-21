import { Button, Table } from 'antd'
import { hideLoading, showLoading } from '../../redux/loaderSlice'
import { getMovies } from '../../api/movie'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import MovieForm from './MovieForm'
import DeleteMovieModal from './DeleteMovieModal'

const MovieList = () => {

    const latestMovies = []

    const columns = [
        {
            title: "Poster",
            dataIndex: "poster",
            render: (url) => <img src={url} alt="poster" width={150} />
        },
        {
            title: "Movie Name",
            dataIndex: "movieName",
        },
        {
            title: "Description",
            dataIndex: "description",
            width: 200,
        },
        {
            title: "Duration (mins)",
            dataIndex: "duration",
            render: (duration) => `${duration} mins`
        },
        {
            title: "Genre",
            dataIndex: "genre",
        },
        {
            title: "Language",
            dataIndex: "language",
        },
        {
            title: "Release date",
            dataIndex: "releaseDate",
            render: (date) => new Date(date).toLocaleDateString()
        },
        {
            title: "Action",
            render: () => {
                return (
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Button onClick={() => {
                            setIsModalOpen(true);
                            setFormType("edit");
                        }}>
                            <EditOutlined />
                        </Button>
                        <Button onClick={() => {
                            setIsDeleteModalOpen(true);
                            setFormType("delete");
                        }}>
                            <DeleteOutlined />
                        </Button>
                    </div>
                )
            }
        }
    ]

    const [movies, setMovies] = useState(latestMovies);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [formType, setFormType] = useState("add");

    const dispatch = useDispatch();

    const getData = async () => {
        dispatch(showLoading());

        // Make API request
        const movies = await getMovies();
        console.log(movies.data);
        setMovies(movies?.data.map((item) => {
            return { ...item, key: `item_${item._id}` }
        }));

        dispatch(hideLoading());
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <div className='d-flex justify-content-end mb-10px'>
                <Button
                    onClick={() => {
                        setFormType("add");
                        setIsModalOpen(true);
                    }}
                >
                    Add Movie
                </Button>
            </div>
            <Table dataSource={movies} columns={columns} pagination={{ pageSize: 5 }} />
            {
                isModalOpen && (
                    <MovieForm
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        formType={formType}
                        selectedMovie={selectedMovie}
                        setSelectedMovie={setSelectedMovie}
                        getData={getData}
                    />
                )
            }
            {
                isDeleteModalOpen && (
                    <DeleteMovieModal
                        isDeleteModalOpen={isDeleteModalOpen}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        selectedMovie={selectedMovie}
                        setSelectedMovie={setSelectedMovie}
                        getData={getData}
                    />
                )
            }
        </div>
    )
}

export default MovieList
