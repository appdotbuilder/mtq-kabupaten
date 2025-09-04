import React from 'react';
import { router, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Participant {
    id: number;
    participant_number: string | null;
    name: string;
    nik: string;
    district: string;
    competition_branch: string;
    category: string;
    type: string;
    status: string;
    created_at: string;
}

interface Props {
    participants: {
        data: Participant[];
        links: unknown[];
        meta: {
            total: number;
        };
    };
    filters: {
        branch?: string;
        category?: string;
        type?: string;
        district?: string;
        status?: string;
    };
    [key: string]: unknown;
}

export default function ParticipantsIndex({ participants, filters }: Props) {
    const { auth } = usePage<{ auth: { user: { role: string } } }>().props;

    const branches = [
        'Tafsir Al-Qur`an',
        'Karya Tulis Ilmiah Al-Qur`an', 
        'Musabaqah Hafalan Hadits',
        'Tilawah Al-Qur`an',
        'Hifzhil Al-Qur`an',
        'Khattil Al-Qur`an',
        'Syarhil Al-Qur`an',
        'Fahmil Al-Qur`an',
        'Barzanji'
    ];

    const handleFilter = (key: string, value: string) => {
        const params = new URLSearchParams(window.location.search);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.get('/participants', Object.fromEntries(params.entries()), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Lulus':
                return <Badge className="bg-green-100 text-green-800">✅ Lulus</Badge>;
            case 'Tidak Lulus':
                return <Badge className="bg-red-100 text-red-800">❌ Tidak Lulus</Badge>;
            default:
                return <Badge className="bg-yellow-100 text-yellow-800">⏳ Belum Verifikasi</Badge>;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    if (auth.user.role !== 'panitia') {
        return (
            <AppLayout>
                <div className="container mx-auto py-8 text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Akses Ditolak</h1>
                    <p>Hanya panitia yang dapat mengakses halaman ini.</p>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="container mx-auto py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            👥 Manajemen Peserta
                        </h1>
                        <p className="text-gray-600">
                            Kelola data peserta, verifikasi pendaftaran, dan tetapkan nomor peserta
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg">🔍 Filter Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <Select
                                value={filters.branch || ''}
                                onValueChange={(value) => handleFilter('branch', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Cabang Lomba" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Semua Cabang</SelectItem>
                                    {branches.map((branch) => (
                                        <SelectItem key={branch} value={branch}>
                                            {branch}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                value={filters.type || ''}
                                onValueChange={(value) => handleFilter('type', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Jenis" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Putra & Putri</SelectItem>
                                    <SelectItem value="Putra">Putra</SelectItem>
                                    <SelectItem value="Putri">Putri</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={filters.status || ''}
                                onValueChange={(value) => handleFilter('status', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Semua Status</SelectItem>
                                    <SelectItem value="Belum Verifikasi">Belum Verifikasi</SelectItem>
                                    <SelectItem value="Lulus">Lulus</SelectItem>
                                    <SelectItem value="Tidak Lulus">Tidak Lulus</SelectItem>
                                </SelectContent>
                            </Select>

                            <Input 
                                placeholder="Cari nama/kecamatan..."
                                value={filters.district || ''}
                                onChange={(e) => handleFilter('district', e.target.value)}
                            />

                            <Button 
                                variant="outline" 
                                onClick={() => router.get('/participants')}
                                className="w-full"
                            >
                                🔄 Reset
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-blue-600">{participants.meta.total}</div>
                            <div className="text-sm text-gray-600">Total Peserta</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-yellow-600">
                                {participants.data.filter(p => p.status === 'Belum Verifikasi').length}
                            </div>
                            <div className="text-sm text-gray-600">Belum Verifikasi</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-green-600">
                                {participants.data.filter(p => p.status === 'Lulus').length}
                            </div>
                            <div className="text-sm text-gray-600">Lulus</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-red-600">
                                {participants.data.filter(p => p.status === 'Tidak Lulus').length}
                            </div>
                            <div className="text-sm text-gray-600">Tidak Lulus</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Participants List */}
                <div className="space-y-4">
                    {participants.data.map((participant) => (
                        <Card key={participant.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 font-bold">
                                                {participant.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-900">
                                                {participant.name}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {participant.participant_number ? 
                                                    `No. ${participant.participant_number}` : 
                                                    'Belum ada nomor peserta'
                                                } • {participant.district}
                                            </p>
                                            <div className="flex gap-2 mt-2">
                                                <Badge variant="outline" className="text-xs">
                                                    {participant.competition_branch}
                                                </Badge>
                                                <Badge variant="secondary" className="text-xs">
                                                    {participant.category}
                                                </Badge>
                                                <Badge variant="outline" className="text-xs">
                                                    {participant.type}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="mb-2">
                                            {getStatusBadge(participant.status)}
                                        </div>
                                        <p className="text-xs text-gray-500 mb-3">
                                            Daftar: {formatDate(participant.created_at)}
                                        </p>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" asChild>
                                                <Link href={`/participants/${participant.id}`}>
                                                    👁️ Lihat
                                                </Link>
                                            </Button>
                                            <Button size="sm" asChild>
                                                <Link href={`/participants/${participant.id}/edit`}>
                                                    ✏️ Edit
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {participants.data.length === 0 && (
                    <Card>
                        <CardContent className="text-center py-12">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                Tidak Ada Peserta
                            </h3>
                            <p className="text-gray-500">
                                Belum ada peserta yang terdaftar atau sesuai dengan filter.
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination would go here if needed */}
            </div>
        </AppLayout>
    );
}