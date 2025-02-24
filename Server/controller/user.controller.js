import { User } from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/generateToken.js'
import { deleteMediaFromCloudinary, uploadMedia } from '../utils/cloudinary.js'

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        const user = await User.findOne({email})
        if (user) {
            return  res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            name,
            email,
            password: hashedPassword
        })
        return res.status(201).json({
            success: true,
            message: 'Account created successfully'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Failed to register account'
        })
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect email'
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Password did not match'
            })
        }
        generateToken(res, user, `Welcome back ${user.name}`)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Failed to log into account'
        })
    }
}

export const logout = async (_, res) => {
    try {
        return res.status(200).cookie('token', '', {maxAge: 0}).json({
            success: true,
            message: 'Logged out of account'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Failed to log out of account'
        })
    }
}

export const getUserProfile = async (req,res) => {
    try {
        const userID = req.id
        const user = await User.findById(userID).select('-password').populate('enrolledCourses')
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            })
        }
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Failed to load user'
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userID = req.id
        const { name } = req.body
        const profilePhoto = req.file
        const user = await User.findById(userID)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            })
        }
        if (user.photoURL) {
            const publicID = user.photoURL.split('/').pop().split('.')[0]
            deleteMediaFromCloudinary(publicID)
        }
        const cloudResponse = await uploadMedia(profilePhoto.path)
        const photoURL = cloudResponse.secure_url
        const updatedData = {name, photoURL}
        const updatedUser = await User.findByIdAndUpdate(userID, updatedData, {new: true}).select('-password')
        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: 'Profile updated successfully'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Failed to update profile'
        })
    }
}