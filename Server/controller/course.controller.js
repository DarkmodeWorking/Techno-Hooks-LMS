import { Course } from '../models/course.model.js'
import { Lecture } from '../models/lecture.model.js'
import { deleteMediaFromCloudinary, deleteVideoFromCloudinary, uploadMedia } from '../utils/cloudinary.js'

export const createCourse = async (req, res) => {
    try {
        const {courseTitle, category} = req.body 
        if (!courseTitle || !category) {
            return res.status(400).json({
                success: false,
                message: 'Course title and category are required'
            })
        }
        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id
        })
        return res.status(201).json({
            success: true,
            course,
            message: 'Course created'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to create course'
        })
    }
}

export const searchCourse = async (req,res) => {
    try {
        const {query = "", categories = [], sortByPrice =""} = req.query;
        console.log(categories);
        
        // create search query
        const searchCriteria = {
            isPublished:true,
            $or:[
                {courseTitle: {$regex:query, $options:"i"}},
                {subTitle: {$regex:query, $options:"i"}},
                {category: {$regex:query, $options:"i"}},
            ]
        }

        // if categories selected
        if(categories.length > 0) {
            searchCriteria.category = {$in: categories};
        }

        // define sorting order
        const sortOptions = {};
        if(sortByPrice === "low"){
            sortOptions.coursePrice = 1;//sort by price in ascending
        }else if(sortByPrice === "high"){
            sortOptions.coursePrice = -1; // descending
        }

        let courses = await Course.find(searchCriteria).populate({path:"creator", select:"name photoUrl"}).sort(sortOptions);

        return res.status(200).json({
            success:true,
            courses: courses || []
        });

    } catch (error) {
        console.log(error);
        
    }
}

export const getPublishedCourse = async (_, res) => {
    try {
        const courses = await Course.find({isPublished: true}).populate({path:'creator', select: 'name photoURL'})
        if (!courses) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            })
        }
        return res.status(200).json({
            courses
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Failed to get Published Course'
        })
    }
}

export const getCreatorCourses = async (req, res) => {
    try {
        const userID = req.id
        const courses = await Course.find({creator: userID})
        if (!courses) {
            return res.status(404).json({
                success: false,
                course: [],
                message: 'Course Not Found'
            })
        }
        return res.status(200).json({
            success: true,
            courses,
            message: 'Courses listed successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to get Creators Courses'
        })
    }
}

export const editCourse = async (req, res) => {
    try {
        const courseID = req.params.courseId
        const {courseTitle, subTitle, description, category, courseLevel, coursePrice} = req.body
        const thumbnail = req.file
        let course = await Course.findById(courseID)
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            })
        }
        let courseThumbnail
        if (thumbnail) {
            if (course.courseThumbnail) {
                const publicID = course.courseThumbnail.split('/').pop().split('.')[0]
                await deleteMediaFromCloudinary(publicID)
            }
            courseThumbnail = await uploadMedia(thumbnail.path)
        }
        const updateData = {courseTitle, subTitle, description, category, courseLevel, coursePrice, courseThumbnail: courseThumbnail?.secure_url}
        course = await Course.findByIdAndUpdate(courseID, updateData, {new: true})
        return res.status(200).json({
            course,
            success: true,
            message: 'Course updated successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to edit Course'
        })
    }
}

export const getCourseByID = async (req, res) => {
    try {
        const {courseId} = req.params
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            })
        }
        return res.status(200).json({
            course,
            success: true,
            message: 'Course found'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch Course by ID'
        })
    }
}

export const createLecture = async (req, res) => {
    try {
        const {lectureTitle} = req.body
        const {courseId} = req.params
        if (!lectureTitle || !courseId) {
            return res.status(404).json({
                success: false,
                message: 'Lecture Title and Course ID is required'
            })
        }
        const lecture = await Lecture.create({lectureTitle})
        const course = await Course.findById(courseId)
        if (course) {
            course.lectures.push(lecture._id)
            await course.save()
        }
        return res.status(201).json({
            lecture,
            success: true,
            message: 'Lecture created successfully'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Failed to create Lecture'
        })
    }
}

export const getCourseLecture = async (req, res) => {
    try {
        const {courseId} = req.params
        const course = await Course.findById(courseId).populate('lectures')
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            })
        }
        return res.status(200).json({
            lectures: course.lectures,
            success: true,
            message: 'Course got'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Failed to get Lecture'
        })
    }
}

export const editLecture = async (req, res) => {
    try {
        const { lectureTitle, videoInfo, isPreviewFree } = req.body
        const { courseId, lectureId } = req.params
        const lecture = await Lecture.findById(lectureId)
        if (!lecture) {
            return res.status.json({
                success: false,
                message: 'Lecture not found'
            })
        }
        if (lectureTitle) {
            lecture.lectureTitle = lectureTitle
        }
        if (videoInfo?.videoUrl) {
            lecture.videoUrl = videoInfo.videoUrl
        }
        if (videoInfo?.publicId) {
            lecture.publicId = videoInfo.publicId
        }
        lecture.isPreviewFree = isPreviewFree
        await lecture.save()
        const course = await Course.findById(courseId)
        if (course && !course.lectures.includes(lecture._id)) {
            course.lectures.push(lecture._id)
            await course.save()
        }
        return res.status(200).json({
            lecture,
            success: true,
            message: 'Lecture updated successfully'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Failed to edit lectures'
        })
    }
}

export const removeLecture = async (req, res) => {
    try {
        const {lectureId} = req.params
        const lecture = await Lecture.findByIdAndDelete(lectureId)
        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: 'Lecture not found'
            })
        }
        if (lecture.publicId) {
            await deleteVideoFromCloudinary(lecture.publicId)
        }
        await Course.updateOne(
            {lectures: lectureId},
            {$pull: {lectures: lectureId}}
        )
        return res.status(200).json({
            success: true,
            message: 'Lecture removed successfully'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Failed to remove lecture'
        })
    }
}

export const getLectureById = async (req, res) => {
    try {
        const {lectureId} = req.params
        const lecture = await Lecture.findById(lectureId)
        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: 'Lecture not found'
            })
        }
        return res.status(200).json({
            lecture,
            success: true,
            message: 'Lecture found'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Failed to get lecture by ID'
        })
    }
}

export const togglePublishCourse = async (req, res) => {
    try {
        const {courseId} = req.params
        const {publish} = req.query
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            })
        }
        course.isPublished = publish === 'true'
        await course.save()
        const statusMessage = course.isPublished ? 'Published' : 'Unpublished'
        return res.status(200).json({
            success: true,
            message: `Course is ${statusMessage}`
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Failed to update status'
        })
    }
}