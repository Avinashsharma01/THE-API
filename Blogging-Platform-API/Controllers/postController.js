import Post from "../Models/models.Post.js"

const createPost = async (req, res) => {
    try {
        const { title, content, category, tags } = req.body

        const newPost = new Post({
            title,
            content,
            category,
            tags,
            author: req.user.id
        })
        await newPost.save()
        res.status(201).json(newPost)

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

const getPost = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "username email")
        res.json(posts)
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}


const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "username email")

        if (!post) {
            return res.status(404).json({ message: 'Post not  found' })
        }
        res.json(post)
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}


const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ message: 'Post not  found' })
        }

        if (post.author.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ message: "Not authorized" });
        }


        post.title = req.body.title || post.title
        post.content = req.body.content || post.content;
        post.category = req.body.category || post.category;
        post.tags = req.body.tags || post.tags;

        await post.save();
        res.json(post)

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}


const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }

        if (post.author.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await post.deleteOne();
        res.json({ message: 'post deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export {
    createPost,
    getPost,
    getPostById,
    updatePost,
    deletePost
}