import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';

export default function CreateParticipant() {
    const { data, setData, post, processing, errors } = useForm({
        photo: null as File | null,
        nik: '',
        name: '',
        birth_date: '',
        gender: '',
        district: '',
        competition_branch: '',
        category: '',
        type: '',
        notes: '',
    });

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

    const categories = [
        '10 Juz', '30 Juz', '5 Juz dan Tilawah', '1 Juz dan Tilawah', '20 Juz', 
        'Anak-anak', 'Bahasa Indonesia Beserta Hafalan 30 Juz Dan Tafsir Juz XV (Lima Belas)',
        'Bahasa Arab Beserta Hafalan 30 Juz Dan Tafsir Juz XV (Lima Belas)',
        'Bahasa Inggris Beserta Hafalan Juz 1 s/d 17 Dan Tafsir Juz XIII (Tiga Belas)',
        'Cacat Netra', 'Dewasa', 'Dekorasi', 'Dewasa Qira`at Mujawwad', 
        'Dewasa Qira`at Murattal', 'Fahmil Quran Putri', 'Fahmil Quran Putra',
        'Hafalan 500 Hadits tanpa Sanad', 'Hafalan 100 Hadits dengan Sanad',
        'Hiasan Mushaf', 'Kaligrafi Digital', 'Kontemporer', 
        'Karya Tulis Ilmiah Hadits', 'KTIQ', 'Remaja', 'Naskah',
        'Remaja Qira`at Murattal', 'Tartil Al-Qur`an', 
        'Syarhil Quran Putra', 'Syarhil Quran Putri'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/daftar');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-green-800 mb-2">
                        📝 Pendaftaran Peserta MTQ
                    </h1>
                    <p className="text-gray-600">
                        Isi formulir berikut untuk mendaftar sebagai peserta Musabaqah Tilawatil Quran
                    </p>
                </div>

                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Form Pendaftaran</CardTitle>
                        <CardDescription>
                            Pastikan semua data yang diisi sudah benar dan sesuai dengan dokumen resmi.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Photo Upload */}
                            <div className="space-y-2">
                                <Label htmlFor="photo">Foto Peserta (Opsional)</Label>
                                <Input
                                    id="photo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('photo', e.target.files?.[0] || null)}
                                />
                                <InputError message={errors.photo} />
                            </div>

                            {/* NIK */}
                            <div className="space-y-2">
                                <Label htmlFor="nik">NIK *</Label>
                                <Input
                                    id="nik"
                                    type="text"
                                    value={data.nik}
                                    onChange={(e) => setData('nik', e.target.value)}
                                    placeholder="Masukkan NIK 16 digit"
                                    maxLength={16}
                                    required
                                />
                                <InputError message={errors.nik} />
                            </div>

                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Lengkap *</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Masukkan nama lengkap"
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>

                            {/* Birth Date */}
                            <div className="space-y-2">
                                <Label htmlFor="birth_date">Tanggal Lahir *</Label>
                                <Input
                                    id="birth_date"
                                    type="date"
                                    value={data.birth_date}
                                    onChange={(e) => setData('birth_date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.birth_date} />
                            </div>

                            {/* Gender */}
                            <div className="space-y-2">
                                <Label htmlFor="gender">Jenis Kelamin *</Label>
                                <Select 
                                    value={data.gender} 
                                    onValueChange={(value) => setData('gender', value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih jenis kelamin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Putra">Putra</SelectItem>
                                        <SelectItem value="Putri">Putri</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.gender} />
                            </div>

                            {/* District */}
                            <div className="space-y-2">
                                <Label htmlFor="district">Kecamatan *</Label>
                                <Input
                                    id="district"
                                    type="text"
                                    value={data.district}
                                    onChange={(e) => setData('district', e.target.value)}
                                    placeholder="Masukkan nama kecamatan"
                                    required
                                />
                                <InputError message={errors.district} />
                            </div>

                            {/* Competition Branch */}
                            <div className="space-y-2">
                                <Label htmlFor="competition_branch">Cabang Lomba *</Label>
                                <Select 
                                    value={data.competition_branch} 
                                    onValueChange={(value) => setData('competition_branch', value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih cabang lomba" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {branches.map((branch) => (
                                            <SelectItem key={branch} value={branch}>
                                                {branch}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.competition_branch} />
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <Label htmlFor="category">Golongan *</Label>
                                <Select 
                                    value={data.category} 
                                    onValueChange={(value) => setData('category', value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih golongan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.category} />
                            </div>

                            {/* Type */}
                            <div className="space-y-2">
                                <Label htmlFor="type">Jenis Peserta *</Label>
                                <Select 
                                    value={data.type} 
                                    onValueChange={(value) => setData('type', value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih jenis peserta" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Putra">Putra</SelectItem>
                                        <SelectItem value="Putri">Putri</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.type} />
                            </div>

                            {/* Notes */}
                            <div className="space-y-2">
                                <Label htmlFor="notes">Catatan (Opsional)</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Catatan tambahan jika ada"
                                    rows={3}
                                />
                                <InputError message={errors.notes} />
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                    {processing ? 'Mendaftarkan...' : '📤 Daftar Sekarang'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                    className="flex-1"
                                >
                                    ↩️ Kembali
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Info Card */}
                <Card className="max-w-2xl mx-auto mt-6">
                    <CardHeader>
                        <CardTitle className="text-lg">ℹ️ Informasi Penting</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p>• Data yang sudah didaftarkan akan diverifikasi oleh panitia</p>
                        <p>• Status verifikasi dapat dilihat setelah login dengan akun yang terdaftar</p>
                        <p>• Nomor peserta akan diberikan otomatis setelah verifikasi lulus</p>
                        <p>• Pastikan data yang diisi sudah benar karena akan sulit diubah kemudian</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}