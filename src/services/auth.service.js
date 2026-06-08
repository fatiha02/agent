import User from '@/models/User';
import dbConnect from '@/lib/mongoose';
import bcrypt from 'bcryptjs';

export async function createUser(data) {
    await dbConnect();

    const { name, email, password, role } = data;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('User already exists.');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
    };
}

export async function getUserByEmail(email) {
    await dbConnect();
    return User.findOne({ email });
}
