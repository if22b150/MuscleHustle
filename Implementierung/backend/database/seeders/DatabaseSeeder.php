<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Enums\EExerciseType;
use App\Enums\EGender;
use App\Enums\ERole;
use App\Models\Exercise;
use App\Models\MuscleGroup;
use App\Models\Schedule;
use App\Models\Set;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = new User([
            'firstname' => 'Trainer',
            'lastname' => 'Thomas',
            'phone' => '06601234567',
            'gender' => EGender::MALE,
            'email' => 'if22b150@technikum-wien.at',
            'password' => Hash::make('123456'),
            'role' => ERole::COACH,
        ]);
        $user->markEmailAsVerified();
        $user->save();

        $user = new User([
            'firstname' => 'Margit',
            'lastname' => 'Musterfrau',
            'phone' => '06601234567',
            'gender' => EGender::FEMALE,
            'email' => 'e.auer@itkaufmann.at',
            'password' => Hash::make('123456'),
            'role' => ERole::CLIENT,
            'coach_user_id' => 1
        ]);
        $user->markEmailAsVerified();
        $user->save();

        $muscleGroup = new MuscleGroup([
            'name' => 'Bizeps'
        ]);
        $muscleGroup->save();
        $muscleGroup = new MuscleGroup([
            'name' => 'Trizeps'
        ]);
        $muscleGroup->save();
        $muscleGroup = new MuscleGroup([
            'name' => 'Brust'
        ]);
        $muscleGroup->save();
        $muscleGroup = new MuscleGroup([
            'name' => 'Bauch'
        ]);
        $muscleGroup->save();
        $muscleGroup = new MuscleGroup([
            'name' => 'Lat'
        ]);
        $muscleGroup->save();
        $muscleGroup = new MuscleGroup([
            'name' => 'Schultern'
        ]);
        $muscleGroup->save();


        $exercise = new Exercise([
            'type' => EExerciseType::WEIGHT,
            'name' => 'Bandrücken',
            'video_link' => 'https://www.youtube.com/embed/2qOOGrcxuTE?si=fobZHBdNsMxXJSZp',
            'description' => '- Lege dich auf eine Flachbank. Die Schultern werden beim Bankdrücken zurückgezogen und du kommst gleichzeitig in ein leichtes Hohlkreuz. Die verlängerte Linie zwischen Schultern und Beginn der Lendenwirbelsäule sollte dabei auf der Bank aufliegen. Unter dem unteren Rückenstrecker sollte noch ein Arm durchgestreckt werden können. Der Kopf liegt auf der Bank flach auf, die Augen fixieren die Stange. Die Beine befinden sich dabei im 90° Winkel fest aufgestellt auf dem Boden.\n- Für die richtige Griffstellung beim Bankdrücken umfasse die Stange in etwa schulterweit. Die Handgelenke werden gerade gehalten und die Langhantelstange mit einem sehr festen Griff umschlossen.\n- Nun folgt die Einleitung der Bewegung. Atme dafür tief ein und spanne gleichzeitig den Rücken, Po und die fixierten Schulterblätter an. Durch das tiefe Einatmen stabilisierst du die gesamte Körpermitte und nimmst den Druck von deinen Bandscheiben und der Wirbelsäule.\n- Die Stange wird nun langsam und kontrolliert auf der Brust abgesetzt. Die Brust bleibt dabei permanent unter Spannung. Der kurze Zwischenstopp auf der Brust sollte nicht dazu genutzt werden, die Spannung zu verlieren. Als Fixpunkt für das Absetzen dient hier das untere Ende des Brustbeins (unter den Brustwarzen).\n- Für die positive Bewegung wird die Stange anschließend explosiv nach oben geführt. Wichtig ist, gleichzeitig die Schulterblätter zu fixieren und die gesamte Körpermitte fest und stabil zu halten. Die Kraft wird durch das Ausatmen aus dem Bauchraum und den stabilen Stand der Füße unterstützt.'
        ]);
        $exercise->save();
        $exercise->muscleGroups()->attach([3,2]);

        $exercise = new Exercise([
            'type' => EExerciseType::BODY_WEIGHT,
            'name' => 'Liegestütz',
            'video_link' => 'https://www.youtube.com/embed/uOSLQ_7E17M?si=ClzIDuxmqzNorjyb',
            'description' => '- Beginne in einer Planke-Position mit deinem Körper in einer geraden Linie von Kopf bis zu den Füßen.\n- Deine Hände sollten etwa schulterbreit voneinander entfernt sein und sich unterhalb deiner Schultern befinden.\n- Beuge deine Ellenbogen langsam, senke deinen Oberkörper kontrolliert ab und halte deinen Rücken gerade.\n- Atme während des Absenkens ein.\n- Senke deinen Körper, bis deine Brust fast den Boden berührt. Dein Körper sollte etwa eine Handbreite vom Boden entfernt sein.\n- Drücke dich mit deinen Armen wieder nach oben, bis sie fast ganz gestreckt sind.\n- Atme während des Hochdrückens aus.\n- Wiederhole die Bewegung für die gewünschte Anzahl von Wiederholungen.'
        ]);
        $exercise->save();
        $exercise->muscleGroups()->attach([3,2,1]);

        $exercise = new Exercise([
            'type' => EExerciseType::WEIGHT,
            'name' => 'Schulterdrücken mit Langhantel',
            'video_link' => 'https://www.youtube.com/embed/VbFERsGRgGM?si=H5CEIJuz0KWdlNTQ',
            'description' => '- Stehe aufrecht und fest, mit deinen Füßen etwa schulterbreit voneinander.\n- Stelle sicher, dass deine Knie leicht gebeugt sind, um eine Überstreckung zu vermeiden und deine Gelenke zu schonen.\n- Die Langhantel wird auf Brusthöhe in einem Rack oder auf deinen Schultern platziert.\n- Greife die Langhantel mit beiden Händen leicht breiter als schulterbreit.\n- Die Handflächen zeigen nach vorne oder leicht nach innen.\n- Atme ein und hebe die Langhantel von deinen Schultern, indem du deine Arme ausstreckst. Deine Arme sollten gestreckt, aber nicht überstreckt sein.\n- Atme aus und drücke die Langhantel langsam und kontrolliert über deinen Kopf nach oben.\n- Halte deinen Rücken gerade und vermeide ein übermäßiges Hohlkreuz.\n- Halte die Langhantel für einen kurzen Moment über deinem Kopf, bevor du sie wieder absenkst.\n- Atme ein und senke die Langhantel kontrolliert zurück auf Schulterhöhe.\n- Achte darauf, dass die Bewegung langsam und kontrolliert erfolgt, um Verletzungen zu vermeiden.\n- Wiederhole die Bewegung für die gewünschte Anzahl von Wiederholungen.'
        ]);
        $exercise->save();
        $exercise->muscleGroups()->attach([6,3]);

        $exercise = new Exercise([
            'type' => EExerciseType::BODY_WEIGHT,
            'name' => 'Sit-Ups',
            'video_link' => 'https://www.youtube.com/embed/YOLp-icvUmE?si=0W_HFNiB4Zjmv8Hd',
            'description' => '- Lege eine Trainingsmatte auf den Boden und setze dich auf sie. Die Knie sollten gebeugt sein, und die Füße flach auf dem Boden stehen etwa hüftbreit auseinander.\n- Lege deine Hände hinter den Kopf und verschränke die Finger. Alternativ kannst du die Hände leicht auf die Brust legen, oder du kannst die Arme ausgestreckt vor dir halten.\n- Achte darauf, dass dein Nacken in einer neutralen Position ist. Das bedeutet, dass du nicht deinen Kopf nach vorne ziehst oder deinen Kinn zu deiner Brust ziehst. Halte den Blick nach oben gerichtet.\n- Atme aus und spanne deine Bauchmuskeln an.\n- DHebe deinen Oberkörper langsam und kontrolliert vom Boden ab, indem du deine Bauchmuskeln benutzt, um dich nach vorne zu bewegen.\n- Dein Ziel ist es, deine Schulterblätter vom Boden abzuheben. Du musst nicht ganz aufrecht sitzen.\n- Halte diese Position kurz, um die Spannung in den Bauchmuskeln zu spüren.\n- Achte darauf, dass du nicht nach vorne überstreckst oder deinen Rücken rund machst.\n- Senke deinen Oberkörper langsam und kontrolliert wieder auf die Matte ab, während du einatmest.\n- Halte den Kontakt mit der Matte, ohne deinen Kopf oder Schultern auf den Boden abzulegen.\n- Wiederhole die Bewegung für die gewünschte Anzahl von Wiederholungen.'
        ]);
        $exercise->save();
        $exercise->muscleGroups()->attach([4]);

        $schedule = new Schedule([
            'name' => 'Push Day',
            'visible' => false,
            'client_user_id' => 2,
            'coach_user_id' => 1,
        ]);
        $schedule->save();

        $set = new Set([
            'weight' => null,
            'duration' => null,
            'reps' => 12,
            'rpe' => 5,
            'break' => 120,
            'order' => 0,
            'schedule_id' => 1,
            'exercise_id' => 2
        ]);
        $set->save();
        $set = new Set([
            'weight' => null,
            'duration' => null,
            'reps' => 15,
            'rpe' => 6,
            'break' => 180,
            'order' => 1,
            'schedule_id' => 1,
            'exercise_id' => 2
        ]);
        $set->save();

        $set = new Set([
            'weight' => 70,
            'duration' => null,
            'reps' => 8,
            'rpe' => 6,
            'break' => 180,
            'order' => 2,
            'schedule_id' => 1,
            'exercise_id' => 1
        ]);
        $set->save();
        $set = new Set([
            'weight' => 73,
            'duration' => null,
            'reps' => 8,
            'rpe' => 7,
            'break' => 180,
            'order' => 3,
            'schedule_id' => 1,
            'exercise_id' => 1
        ]);
        $set->save();
        $set = new Set([
            'weight' => 75,
            'duration' => null,
            'reps' => 8,
            'rpe' => 8,
            'break' => 180,
            'order' => 4,
            'schedule_id' => 1,
            'exercise_id' => 1
        ]);
        $set->save();

        $set = new Set([
            'weight' => 40,
            'duration' => null,
            'reps' => 10,
            'rpe' => 6,
            'break' => 180,
            'order' => 5,
            'schedule_id' => 1,
            'exercise_id' => 3
        ]);
        $set->save();
        $set = new Set([
            'weight' => 42,
            'duration' => null,
            'reps' => 10,
            'rpe' => 8,
            'break' => 180,
            'order' => 6,
            'schedule_id' => 1,
            'exercise_id' => 3
        ]);
        $set->save();

        $set = new Set([
            'weight' => null,
            'duration' => null,
            'reps' => 15,
            'rpe' => 5,
            'break' => 60,
            'order' => 7,
            'schedule_id' => 1,
            'exercise_id' => 4
        ]);
        $set->save();
        $set = new Set([
            'weight' => null,
            'duration' => null,
            'reps' => 15,
            'rpe' => 6,
            'break' => 60,
            'order' => 8,
            'schedule_id' => 1,
            'exercise_id' => 4
        ]);
        $set->save();
        $set = new Set([
            'weight' => null,
            'duration' => null,
            'reps' => 15,
            'rpe' => 6,
            'break' => 60,
            'order' => 9,
            'schedule_id' => 1,
            'exercise_id' => 4
        ]);
        $set->save();
    }
}
