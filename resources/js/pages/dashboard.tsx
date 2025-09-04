import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DashboardData {
    auth: {
        user: {
            name: string;
            email: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function Dashboard() {
    const { auth } = usePage<DashboardData>().props;
    const user = auth.user;

    const getRoleInfo = (role: string) => {
        switch (role) {
            case 'panitia':
                return {
                    title: '👥 Panitia MTQ',
                    description: 'Mengelola data peserta, juri, dan verifikasi',
                    color: 'bg-blue-100 text-blue-800',
                    features: [
                        'Kelola data peserta',
                        'Verifikasi pendaftaran', 
                        'Kelola data juri',
                        'Lihat semua nilai'
                    ]
                };
            case 'juri':
                return {
                    title: '⚖️ Juri MTQ',
                    description: 'Menilai peserta pada cabang yang ditugaskan',
                    color: 'bg-green-100 text-green-800',
                    features: [
                        'Input nilai peserta',
                        'Lihat data peserta',
                        'Kelola penilaian'
                    ]
                };
            case 'peserta':
                return {
                    title: '🎓 Peserta MTQ',
                    description: 'Melihat status pendaftaran dan hasil',
                    color: 'bg-yellow-100 text-yellow-800',
                    features: [
                        'Lihat status pendaftaran',
                        'Lihat hasil nilai',
                        'Update profil'
                    ]
                };
            default:
                return {
                    title: '👤 Pengguna',
                    description: 'Akses dasar aplikasi MTQ',
                    color: 'bg-gray-100 text-gray-800',
                    features: ['Lihat hasil lomba']
                };
        }
    };

    const roleInfo = getRoleInfo(user.role);

    return (
        <AppLayout>
            <div className="container mx-auto py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        🏠 Dashboard MTQ
                    </h1>
                    <p className="text-gray-600">
                        Selamat datang di sistem Musabaqah Tilawatil Quran
                    </p>
                </div>

                <div className="grid gap-6 mb-8">
                    {/* User Info Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>👋 Selamat Datang, {user.name}!</span>
                                <Badge className={roleInfo.color}>
                                    {roleInfo.title}
                                </Badge>
                            </CardTitle>
                            <CardDescription>
                                {roleInfo.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Informasi Akun</h4>
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <p>Email: {user.email}</p>
                                        <p>Role: {user.role}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Akses Fitur</h4>
                                    <ul className="space-y-1 text-sm text-gray-600">
                                        {roleInfo.features.map((feature, index) => (
                                            <li key={index} className="flex items-center">
                                                <span className="text-green-500 mr-2">✓</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Panitia Actions */}
                        {user.role === 'panitia' && (
                            <>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">👥 Kelola Peserta</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Lihat, edit, dan verifikasi data peserta
                                        </p>
                                        <Button asChild className="w-full">
                                            <Link href="/participants">
                                                📋 Data Peserta
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">⚖️ Kelola Juri</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Tambah dan kelola data juri
                                        </p>
                                        <Button asChild className="w-full">
                                            <Link href="/judges">
                                                👨‍⚖️ Data Juri
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">📊 Lihat Nilai</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Monitor penilaian dari juri
                                        </p>
                                        <Button asChild className="w-full" variant="outline">
                                            <Link href="/scores">
                                                📋 Data Nilai
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </>
                        )}

                        {/* Juri Actions */}
                        {user.role === 'juri' && (
                            <>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">📝 Input Nilai</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Berikan penilaian untuk peserta
                                        </p>
                                        <Button asChild className="w-full">
                                            <Link href="/scores">
                                                ⚖️ Panel Penilaian
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">👥 Lihat Peserta</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Lihat peserta yang akan dinilai
                                        </p>
                                        <Button asChild className="w-full" variant="outline">
                                            <Link href="/scores">
                                                📋 Daftar Peserta
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </>
                        )}

                        {/* Common Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">🏆 Hasil Lomba</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 mb-4">
                                    Lihat hasil dan peringkat peserta
                                </p>
                                <Button asChild className="w-full" variant="outline">
                                    <Link href="/hasil">
                                        📊 Lihat Hasil
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">📝 Pendaftaran</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 mb-4">
                                    Form pendaftaran peserta baru
                                </p>
                                <Button asChild className="w-full" variant="outline">
                                    <Link href="/daftar">
                                        ➕ Daftar Peserta
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>📖 Tentang MTQ</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">
                                Musabaqah Tilawatil Quran adalah kompetisi membaca Al-Quran 
                                yang bertujuan untuk meningkatkan kualitas bacaan dan hafalan 
                                Al-Quran di tingkat kabupaten.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>🎯 Cabang Lomba</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p>• Tafsir Al-Qur'an</p>
                                <p>• Tilawah Al-Qur'an</p>
                                <p>• Hifzhil Al-Qur'an</p>
                                <p>• Khattil Al-Qur'an</p>
                                <p>• Dan 5 cabang lainnya...</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}