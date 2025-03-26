import Profiles from '../Models/profilemodel.js';
import express from 'express';

export const getProfile = async () => {
    try {
        const profile = await Profiles.find();
        return profile
    } catch (error) {
        res.error("Error: ", error);
    }
}

export const getProfileById = async (email) => {
    try {
        const profile = await Profiles.findOne({ email: email });
        return profile;
    } catch (error) {
        res.error("Error: ", error);
    }
}
export const createProfile = async (data) => {
    try {
        const profiledata = {
            name: data.name,
            role: data.role,
            personalInfo: data.personalInfo,
            mobileNumber: data.mobileNumber,
            email: data.email,
            location: data.location,
            dob: data.dob,
            projectName: data.projectName,
            projectDescription: data.projectDescription,
            projectMembers: data.projectMembers,
        };
        const profile = new Profiles(profiledata)
        await profile.save()
        // res.status(201).json({profile});
    } catch (error) {
        res.error("Error: ", error);
    }
}
export const updateProfileById = async (email, data) => {
    try {
        const profile = await Profiles.findOneAndUpdate({ email: email }, data, { new: true });
        return profile
        // res.status(200).json({profile});
        // if(!profile) {
        //     return res.status(404).json({message: 'Profile not found'});}
        //     const updatedProfile = await Profile.findById(req.params.id);
        //     res.json(updatedProfile);
    } catch (error) {
        res.error("Error: ", error);
    }
}